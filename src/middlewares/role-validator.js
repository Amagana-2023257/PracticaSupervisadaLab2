export const validateRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "Usuario no autenticado.",
      });
    }

    const { role } = req.user;

    if (role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Acción no permitida para el rol ${role}`,
      });
    }

    next(); 
  };
};
