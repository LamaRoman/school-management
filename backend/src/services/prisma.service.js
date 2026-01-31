import {PrismaClient} from '@prisma/client';
import  {config} from '../config/env.config.js'

const prismaClientSingleton = ()=>{
    return new PrismaClient({
        log: config.env === 'development'
        ? ['query','info','warn','error']
        :['error']
    })
}

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// In development, save to global to prevent multiple instances
if(config.env !== 'production'){
    globalForPrisma.prisma = prisma;
}

export default prisma;

