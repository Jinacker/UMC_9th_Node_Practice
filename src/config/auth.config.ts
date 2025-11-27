import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken"; // JWT 생성을 위해 import 

dotenv.config();
const secret = process.env.JWT_SECRET; // .env의 비밀 키 


// === undefined 가능성 오류 해결 ===
if (!secret) { // 런타임에서 env값 없으면 명확하게 실패시키기 => TS가 검사 후 타입 string으로 좁혀줌
  throw new Error("Missing JWT_SECRET in environment"); 
}

export const generateAccessToken = (user:any) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    secret,                           
    { expiresIn: '1h' }                 
  );
};

export const generateRefreshToken = (user:any) => {
  return jwt.sign(
    { id: user.id },                   
    secret,
    { expiresIn: '14d' }                
  );
};

// ==== OAUTH 셋팅 =====

// GoogleVerify 
const googleVerify = async (profile:any) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// GoogleStrategy 
const clientID = process.env.PASSPORT_GOOGLE_CLIENT_ID; // .env의 비밀 키 
const clientSecret = process.env.PASSPORT_GOOGLE_CLIENT_SECRET; // .env의 비밀 키 

// === undefined 가능성 오류 해결 ===
if (!clientID) { // 런타임에서 env값 없으면 명확하게 실패시키기 => TS가 검사 후 타입 string으로 좁혀줌
  throw new Error("Missing ClientID in environment"); 
}

// === undefined 가능성 오류 해결 ===
if (!clientSecret) {
  throw new Error("Missing PASSPORT_GOOGLE_CLIENT_SECRET in environment");
}

export const googleStrategy = new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: "/oauth2/callback/google", 
    scope: ["email", "profile"],
  },
  

  async (accessToken, refreshToken, profile, cb) => {
    try {
     
      const user = await googleVerify(profile);
      
      
      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateRefreshToken(user);


     
      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });

    } catch (err) {
      return cb(err);
    }
  }
);

// ==== JWT 검증 미들웨어 만들기( passport-jwt 사용) ====

import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret, // process.env 대신 검증된 'secret' 사용
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: payload.id } });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});