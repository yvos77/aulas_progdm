import { Router } from "express"
import { prisma } from "../lib/prisma.js"
import { registerSchema, loginSchema } from "../schemas/authSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET ?? "segredo_super_secreto"

// POST /auth/register - cadastra um novo usuário
router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)

    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (existing) {
      return res.status(409).json({ error: "Email já cadastrado" })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    })

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

// POST /auth/login - autentica um usuário existente
router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (!user) {
      return res.status(401).json({ error: "Email ou senha inválidos" })
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: "Email ou senha inválidos" })
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

export default router