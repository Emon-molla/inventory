import jwt from "jsonwebtoken";

export const roleMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      
      req.user = decoded;

      return next(); 
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

