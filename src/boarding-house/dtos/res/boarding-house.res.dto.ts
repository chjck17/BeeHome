import { BoardingHouse } from '../../entities/boarding-house.entity';

export class BoardingHouseResDto {
  id: number;
  img: string;
  price: string;
  type: string;
  title: string;
  location: string;
  saleTag: string[];
  //   garages: string;
  itemDetails: string[];
  posterAvatar: string;
  posterName: string;
  //   imgList: string;
  //   built: string;
  //   amenities: string;
  //   featured: string;
  //   created_at: string;
  static mapProperty(
    dto: BoardingHouseResDto,
    dataBoardingHouse: BoardingHouse,
  ) {
    dto.id = dataBoardingHouse.id;
    dto.img = dataBoardingHouse?.floors[0]?.rooms[0]?.roomImages[0]?.localFile
      .path
      ? dataBoardingHouse?.floors[0]?.rooms[0]?.roomImages[0]?.localFile.path
      : null;
    dto.price = dataBoardingHouse?.floors[0]?.rooms[0]?.price
      ? dataBoardingHouse?.floors[0]?.rooms[0]?.price
      : null;
    dto.type = dataBoardingHouse?.type ? dataBoardingHouse?.type : null;
    dto.title = dataBoardingHouse?.name ? dataBoardingHouse?.name : null;

    //dto.location = `${dataBoardingHouse?.boardingHouseAddress[0]?.address} ${dataBoardingHouse?.boardingHouseAddress[0]?.city} ${dataBoardingHouse?.boardingHouseAddress[0]?.district} ${dataBoardingHouse?.boardingHouseAddress[0]?.ward}`;
    dto.location = dataBoardingHouse?.boardingHouseAddress?.address
      ? dataBoardingHouse?.boardingHouseAddress?.address
      : null;
    dto.saleTag = dataBoardingHouse?.boardingHouseToTags?.map((item) => {
      return item.tag.name;
    });
    dto.itemDetails = [];
    dto.posterAvatar = null;
    dto.posterName = null;
  }

  static forCustomer(dataBoardingHouse: BoardingHouse) {
    if (!dataBoardingHouse) return null;
    const result = new BoardingHouseResDto();

    this.mapProperty(result, dataBoardingHouse);
    return result;
  }
}
