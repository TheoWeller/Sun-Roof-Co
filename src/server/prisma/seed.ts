import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // Creates projects
  const project1 = await prisma.project.create({
    data: {
      name: 'South Park Builders',
      description: `
        The initiative not only underscores our expertise 
        in large-scale solar installations but also marks 
        a key collaboration with South Park Builders in 
        their pursuit of eco-friendly and energy-efficient 
        building solutions.`,
      startDate: '01/15/2020',
      status: 'In Progress',
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'North Park Builders',
      description: `
        The initiative not only underscores our expertise 
        in large-scale solar installations but also marks 
        a key collaboration with South Park Builders in 
        their pursuit of eco-friendly and energy-efficient 
        building solutions.`,
      startDate: '05/21/2020',
      status: 'Completed',
    },
  });

  // Creates buildings and project relations
  const building1 = await prisma.building.create({
    data: {
      name: 'Main Office Building',
      contact: '(501) 441-6543',
      address1: '123 Solar Ave',
      address2: 'Suite 100',
      city: 'Sunnyville',
      state: 'CA',
      zip: '12345',
      country: 'USA',
      projects: {
        connect: [project1],
      },
    },
  });

  const building2 = await prisma.building.create({
    data: {
      name: 'South Office Building',
      contact: '(642) 123-6543',
      address1: '123 Solar Ave',
      address2: 'Suite 400',
      city: 'Sunnyville',
      state: 'CA',
      zip: '12345',
      country: 'USA',
      projects: {
        connect: [project1],
      },
    },
  });

  const building3 = await prisma.building.create({
    data: {
      name: 'Javits Center',
      contact: '(441) 330-8004',
      address1: '543 1st Ave',
      address2: '',
      city: 'New York',
      state: 'NY',
      zip: '10025',
      country: 'USA',
      projects: {
        connect: [project2],
      },
    },
  });

  // Creates solar panels
  const solarPanel1 = await prisma.solarPanel.create({
    data: {
      name: 'SP-123',
      modelNumber: 'SP123',
      manufacturer: 'SolarTech',
      solarCellType: 'Monocrystalline',
      weight: '20kg',
    },
  });

  const solarPanel2 = await prisma.solarPanel.create({
    data: {
      name: 'SP-450',
      modelNumber: 'SP450',
      manufacturer: 'SolarTech',
      solarCellType: 'Monocrystalline',
      weight: '20kg',
    },
  });

  const solarPanel3 = await prisma.solarPanel.create({
    data: {
      name: 'SP-250',
      modelNumber: 'SP250',
      manufacturer: 'EcoSun',
      solarCellType: 'Polycrystalline',
      weight: '18kg',
    },
  });

  const solarPanel4 = await prisma.solarPanel.create({
    data: {
      name: 'SP-550',
      modelNumber: 'SP550',
      manufacturer: 'BrightFuture',
      solarCellType: 'Thin-Film',
      weight: '15kg',
    },
  });

  // Creates solar panels building relations
  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building1.id,
      solarPanelId: solarPanel1.id,
      solarPanelCount: 5,
      installedAt: '03/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building1.id,
      solarPanelId: solarPanel3.id,
      solarPanelCount: 20,
      installedAt: '03/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building2.id,
      solarPanelId: solarPanel1.id,
      solarPanelCount: 10,
      installedAt: '04/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building2.id,
      solarPanelId: solarPanel4.id,
      solarPanelCount: 100,
      installedAt: '03/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building2.id,
      solarPanelId: solarPanel3.id,
      solarPanelCount: 6,
      installedAt: '03/18/2023',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building3.id,
      solarPanelId: solarPanel1.id,
      solarPanelCount: 4,
      installedAt: '03/11/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building3.id,
      solarPanelId: solarPanel2.id,
      solarPanelCount: 4,
      installedAt: '03/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building3.id,
      solarPanelId: solarPanel4.id,
      solarPanelCount: 90,
      installedAt: '03/18/2021',
    },
  });

  await prisma.buildingSolarPanel.create({
    data: {
      buildingId: building1.id,
      solarPanelId: solarPanel4.id,
      solarPanelCount: 8,
      installedAt: '03/18/2021',
    },
  });

  console.log('Database seeded successfully!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
