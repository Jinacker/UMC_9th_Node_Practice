// 전역 응답 통일용 미들웨어
export const responseWrapper = (req, res, next) => {
    res.success = (success) => {
        return res.json({
            resultType: "SUCCESS",
            error: null,
            success,
        });
    };
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: { errorCode, reason, data },
            success: null,
        });
    };
    next();
};
//# sourceMappingURL=responseWrapper.js.map