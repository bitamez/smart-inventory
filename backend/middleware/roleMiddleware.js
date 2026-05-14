// Role-based access middleware
export const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No user found' });
      }

      // req.userProfile should be set by authMiddleware if profile is fetched
      const userRole = req.userProfile?.role_name;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access Denied: Requires one of these roles: ${allowedRoles.join(', ')}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error in Role Middleware', error: error.message });
    }
  };
};
