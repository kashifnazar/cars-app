import jwt from 'jsonwebtoken'

export function authenticateToken(req: any, res: any, next: any) {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err: any, user: any) => {
      if (err) return res.sendStatus(403)
      next()
    })
  }