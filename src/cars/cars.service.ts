import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Hyundai',
      model: 'Ionic 5',
    },
  ];
  public findAllCars() {
    return this.cars;
  }
  public findCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }
  public createCar(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
  public updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findCarById(id);
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  public deleteCar(id: string) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1)
      throw new NotFoundException(`Car with id '${id}' not found`);
    this.cars.splice(carIndex, 1);
    return {
      method: 'DELETE',
      status: 200,
      id,
    };
  }
}
