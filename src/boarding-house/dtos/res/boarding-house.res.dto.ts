import { BoardingHouse } from '../../entities/boarding-house.entity';
import { BoardingHousePriceResDto } from '../common/misc.res.dto';
interface BoardingHouseResDtoParams {
  dataBoardingHouse: BoardingHouse;
  priceRange?: BoardingHousePriceResDto;
}
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

    dto.type = dataBoardingHouse?.type ? dataBoardingHouse?.type : null;
    dto.title = dataBoardingHouse?.name ? dataBoardingHouse?.name : null;

    dto.location = dataBoardingHouse?.boardingHouseAddress?.address
      ? dataBoardingHouse?.boardingHouseAddress?.address
      : null;
    dto.saleTag = dataBoardingHouse?.boardingHouseToTags?.map((item) => {
      return item.tag.name;
    });
    // dto.itemDetails = dataBoardingHouse.floors;
    dto.posterAvatar = dataBoardingHouse?.user?.lessor?.avatar?.path
      ? dataBoardingHouse?.user?.lessor?.avatar?.path
      : null;
    dto.posterName = dataBoardingHouse?.user?.lessor?.name
      ? dataBoardingHouse?.user?.lessor?.name
      : null;
  }

  static forCustomer({
    dataBoardingHouse,
    priceRange,
  }: BoardingHouseResDtoParams) {
    if (!dataBoardingHouse) return null;
    const result = new BoardingHouseResDto();
    result.price = String(priceRange?.range.min)
      ? String(priceRange?.range.min)
      : null;
    this.mapProperty(result, dataBoardingHouse);
    return result;
  }
}
