import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etiqueta } from './entities/etiqueta.entity';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';

@Injectable()
export class EtiquetaService {
  constructor(
    @InjectRepository(Etiqueta)
    private readonly etiquetaRepository: Repository<Etiqueta>,
  ) {}

  async create(createEtiquetaDto: CreateEtiquetaDto): Promise<Etiqueta> {
    const etiqueta = this.etiquetaRepository.create(createEtiquetaDto);
    return this.etiquetaRepository.save(etiqueta);
  }

  async findAll(): Promise<Etiqueta[]> {
    return this.etiquetaRepository.find();
  }

  async findOne(id: number): Promise<Etiqueta> {
    const etiqueta = await this.etiquetaRepository.findOne({ where: { id } });
    if (!etiqueta)
      throw new NotFoundException(`Etiqueta with ID ${id} not found`);
    return etiqueta;
  }

  async update(
    id: number,
    updateEtiquetaDto: UpdateEtiquetaDto,
  ): Promise<Etiqueta> {
    const etiqueta = await this.findOne(id);
    Object.assign(etiqueta, updateEtiquetaDto);
    return this.etiquetaRepository.save(etiqueta);
  }

  async remove(id: number): Promise<void> {
    const etiqueta = await this.findOne(id);
    await this.etiquetaRepository.remove(etiqueta);
  }
}
