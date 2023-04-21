export class BoardingHousePriceResDto {
  range?: {
    min: number;
    max: number;
  };

  normalPrice?: number;
  salePrice?: number;
}

export class BoardingHousePointResDto {
  range?: {
    min: number;
    max: number;
  };

  normalPoint?: number;
  salePoint?: number;
}
