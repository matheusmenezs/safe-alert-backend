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

  await prisma.user.upsert({
    where: { email: 'police@email.com' },
    update: {},
    create: {
      email: 'police@email.com',
      name: 'Police',
      telephone: '190',
      password: await encryptDate.encrypt(
        process.env.AGENT_PASSWORD ?? 'Police!123456789',
        10,
      ),
      is_active: true,
      role: Role.EMERGENCY,
    },
  });

  await prisma.user.upsert({
    where: { email: 'samu@email.com' },
    update: {},
    create: {
      email: 'samu@email.com',
      name: 'SAMU',
      telephone: '192',
      password: await encryptDate.encrypt(
        process.env.AGENT_PASSWORD ?? 'Samu!123456789',
        10,
      ),
      is_active: true,
      role: Role.EMERGENCY,
    },
  });

  await prisma.user.upsert({
    where: { email: 'firefighters@email.com' },
    update: {},
    create: {
      email: 'firefighters@email.com',
      name: 'Firefighters',
      telephone: '193',
      password: await encryptDate.encrypt(
        process.env.AGENT_PASSWORD ?? 'Firefighters!123456789',
        10,
      ),
      is_active: true,
      role: Role.EMERGENCY,
    },
  });

  await prisma.user.upsert({
    where: { email: 'cemig@email.com' },
    update: {},
    create: {
      email: 'cemig@email.com',
      name: 'Cemig',
      telephone: '116',
      password: await encryptDate.encrypt(
        process.env.AGENT_PASSWORD ?? 'Cemig!123456789',
        10,
      ),
      is_active: true,
      role: Role.EMERGENCY,
    },
  });

  const districts = [
    'Centro',
    'Morro Chic',
    'Pinheirinho',
    'Nossa Senhora da Agonia',
    'Cruzeiro',
    'Oriente',
    'Estiva',
    'Varginha',
    'Porto Velho',
    'Imbel',
    'Santa Rosa',
    'São Vicente',
    'Medicina',
    'Anhumas',
    'São Sebastião',
    'Santa Rita de Cássia',
    'Nossa Senhora de Fátima',
    'Morro Grande',
    'Vila Poddis',
    'Santo Antônio',
    'Santa Luzia',
    'Jardim Bernadete',
    'Rebourgeon',
    'Avenida',
    'São Judas Tadeu',
    'Distrito Industrial',
    'Santos Dumont',
    'Açude',
    'Nações',
    'Piedade',
    'Boa Vista',
    'Vila Rubens',
    'Novo Horizonte',
    'Vila Isabel',
    'Vila Betel',
    'Ponte Alta',
    'Área Rural de Itajubá',
    'São José do Rio Manso'
  ];

  async function createDistricts() {
    try {
      for (const name of districts) {
        await prisma.district.upsert({
          where: { name },
          update: {},
          create: { name },
        });
      }
    } catch (error) {
      console.error('Error creating districts', error);
    }
  }

  await createDistricts();
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
