import { Comment } from '../../../comment/entities/comment.entity';
import { BoardingHouse } from '../../entities/boarding-house.entity';
import {
  BoardingHousePriceResDto,
  BoardingHouseStarResDto,
} from '../common/misc.res.dto';
interface BoardingHouseResDtoParams {
  dataBoardingHouse: BoardingHouse;
  priceRange?: BoardingHousePriceResDto;
  attributes?: any;
  star?: BoardingHouseStarResDto;
}
export class BoardingHouseResDto {
  id: number;
  img: string;
  price: string;
  type: string;
  title: string;
  location: string;
  description: string;
  rule: string;
  rentDeposit: string;
  // saleTag: string[];
  electricFee: string;
  waterFee: string;
  serviceFee: string;
  attributes: string[];
  itemDetails: string[];
  posterAvatar: string;
  posterName: string;
  posterId: number;
  comment: Comment[];
  starAvg: string;
  roomSimple: string;
  toilet: string;
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
    dto.location =
      dataBoardingHouse?.boardingHouseAddress?.address +
      ',' +
      dataBoardingHouse?.boardingHouseAddress?.province +
      ',' +
      dataBoardingHouse?.boardingHouseAddress?.district +
      ',' +
      dataBoardingHouse?.boardingHouseAddress?.ward
        ? dataBoardingHouse?.boardingHouseAddress?.address +
          ',' +
          dataBoardingHouse?.boardingHouseAddress?.ward +
          ',' +
          dataBoardingHouse?.boardingHouseAddress?.district +
          ',' +
          dataBoardingHouse?.boardingHouseAddress?.province
        : null;
    // dto.saleTag = dataBoardingHouse?.boardingHouseToTags?.map((item) => {
    //   return item.tag.name;
    // });
    dto.itemDetails = dataBoardingHouse.boardingHouseImages.map((item) => {
      const img = item.localFile.path;
      return img;
    });
    dto.posterAvatar = dataBoardingHouse?.user?.lessor?.avatar?.path
      ? dataBoardingHouse?.user?.lessor?.avatar?.path
      : null;
    dto.posterName = dataBoardingHouse?.user?.lessor?.name
      ? dataBoardingHouse?.user?.lessor?.name
      : null;
    dto.posterId = dataBoardingHouse?.user?.lessor?.id
      ? dataBoardingHouse?.user?.lessor?.id
      : null;
    dto.electricFee = dataBoardingHouse?.electricFee
      ? dataBoardingHouse?.electricFee
      : null;
    dto.waterFee = dataBoardingHouse?.waterFee
      ? dataBoardingHouse?.waterFee
      : null;
    dto.serviceFee = dataBoardingHouse?.serviceFee
      ? dataBoardingHouse?.serviceFee
      : null;
    dto.rentDeposit = dataBoardingHouse.boardingHouseRentDeposits[0].content;
    dto.description = dataBoardingHouse.boardingHouseDescriptions[0].content;
    dto.rule = dataBoardingHouse.boardingHouseRules[0].content;
    dto.comment = dataBoardingHouse.commentToBoardingHouses.map((item) => {
      const commentItem = item.comment;
      return commentItem;
    });
  }

  static forCustomer({
    dataBoardingHouse,
    priceRange,
    attributes,
    star,
  }: BoardingHouseResDtoParams) {
    if (!dataBoardingHouse) return null;
    const result = new BoardingHouseResDto();
    result.price = String(priceRange?.range.min)
      ? String(priceRange?.range.min)
      : null;
    result.starAvg = String(star?.avg) ? String(star?.avg) : null;
    result.attributes = attributes.map((item) => {
      const attribute = item.name;
      return attribute;
    });
    this.mapProperty(result, dataBoardingHouse);
    return result;
  }
}
