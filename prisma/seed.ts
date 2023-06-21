import { PrismaClient, Role } from '@prisma/client';
import { EncryptData } from '../src/utils/encrypt-data';
const prisma = new PrismaClient();

async function main() {
  const encryptDate = new EncryptData();

  await prisma.user.upsert({
    where: { email: process.env.AGENT_EMAIL },
    update: {},
    create: {
      email: process.env.AGENT_EMAIL ?? 'agent@email.com',
      name: process.env.AGENT_NAME ?? 'Agent',
      telephone: '35999999999',
      password: await encryptDate.encrypt(
        process.env.AGENT_PASSWORD ?? 'Agent!123456789',
        10,
      ),
      is_active: true,
      role: Role.AGENT,
    },
  });

  const districts = [
    'São Vicente',
    'São Judas Tadeu',
    'Centro',
    'Pinheirinho',
    'Varginha',
    'São Vicente',
    'Vila Rubens',
    'Bairros de Itajubá com posto de saúde',
    'Vila Isabel',
    'Jardim das Colinas',
    'Avenida',
    'Cantina',
    'Novo Horizonte',
    'Vila Poddis',
    'Santos Dumont',
    'Santo Antônio',
    'Ponte Santo Antônio',
    'Santa Rosa',
    'Piedade',
    'Estiva',
    'Boa Vista',
    'Vila Rubens',
    'Varginha',
    'Ano Bom',
    'Rebourgeon',
    'Santa Luzia',
    'Medicina',
    'Imbel',
    'Centro',
    'São Vicente',
    'Avenida',
    'Rebourgeon',
    'Varginha',
  ];

  await prisma.district.createMany({
    data: districts.map((name) => ({
      name,
    })),
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
