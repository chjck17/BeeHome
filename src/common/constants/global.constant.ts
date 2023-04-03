import { FileType } from '../enums/file.enum';

export const ABILITY_METADATA_KEY = 'ability';
export enum PrefixType {
  ADMIN = 'admin',
  LESSOR = 'lessor',
  CUSTOMER = 'customer',
  USER = 'user',
}

export const HASH_ROUND = 12;

export const MapFilePathSupport = [
  {
    key: FileType.IMAGE,
    types: ['png', 'jpg', 'jpeg'],
  },
  {
    key: FileType.PDF,
    types: ['pdf'],
  },
  {
    key: FileType.AUDIO,
    types: ['mp3', 'mp4', 'wav'],
  },
];
