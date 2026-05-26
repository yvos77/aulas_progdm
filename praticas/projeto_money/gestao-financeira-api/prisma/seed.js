import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const defaultCategories = [
  { name: "income",    displayName: "Renda",       icon: "account-balance-wallet",  background: "#3a811f", isIncome: true,  isDefault: true },
  { name: "food",      displayName: "Alimentação", icon: "fastfood",                background: "#DEA17B", isIncome: false, isDefault: true },
  { name: "house",     displayName: "Casa",        icon: "home",                    background: "#E6E088", isIncome: false, isDefault: true },
  { name: "shopping",  displayName: "Compras",     icon: "shopping-bag",            background: "#AB8FBE", isIncome: false, isDefault: true },
  { name: "travel",    displayName: "Viagens",     icon: "airplanemode-active",     background: "#82C9DE", isIncome: false, isDefault: true },
  { name: "bills",     displayName: "Contas",      icon: "credit-card",             background: "#952f22", isIncome: false, isDefault: true },
]

async function main() {
  for (const c of defaultCategories) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: c,
      create: c,         
    })
  }
  console.log("Seed concluído.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())