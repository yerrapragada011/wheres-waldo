const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.character.createMany({
    data: [
      { name: 'Waldo', x: '43.57%', y: '19.0%' },
      { name: 'Wanda', x: '35.71%', y: '67.0%' },
      { name: 'Woof', x: '73.21%', y: '42.0%' },
      { name: 'Wizard', x: '65.0%', y: '35.0%' },
      { name: 'Odlaw', x: '12.14%', y: '50.0%' }
    ]
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('done')
  })
