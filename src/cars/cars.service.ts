import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Hyundai',
      model: 'Ionic 5',
    },
  ];
  public findAllCars() {
    return this.cars;
  }
  public findCarById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }
  public createCar(car: any) {
    this.cars.push(car);
    return car;
  }
  public updateCar(id: number, car: any) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1)
      throw new NotFoundException(`Car with id '${id}' not found`);
    this.cars[carIndex] = car;
    return car;
  }
  public deleteCar(id: number) {
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
