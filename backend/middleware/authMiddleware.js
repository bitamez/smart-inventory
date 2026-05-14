import { supabase } from '../config/supabase.js';

// Verify Supabase Auth Token
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in Auth Middleware', error: error.message });
  }
};
