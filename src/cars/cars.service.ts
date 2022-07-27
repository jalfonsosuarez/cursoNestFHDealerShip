import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  public findAll() {
    return this.cars;
  }

  public findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found.`);

    return car;
  }

  public create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  public update(updateCarDto: UpdateCarDto, id: string) {
    let carDB = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Card id is not valid!');

    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  public delete(id: string) {
    const car = this.findOne(id);
    this.cars.splice(
      this.cars.findIndex((car: Car) => car.id === id),
      1,
    );
    return car;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
