import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found.`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand: Brand) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
        };
        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands.splice(
      this.brands.findIndex((brand: Brand) => brand.id === id),
      1,
    );
    return brand;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
