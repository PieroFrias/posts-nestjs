export enum BaseStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PUBLISHED = 'PUBLISHED',
}

export enum GeneralStatus {
  ACTIVE = BaseStatus.ACTIVE,
  INACTIVE = BaseStatus.INACTIVE,
}

export enum PostStatus {
  DRAFT = BaseStatus.DRAFT,
  PUBLISHED = BaseStatus.PUBLISHED,
}

export enum Role {
  ADMIN = 'ADMIN',
  PUBLISHER = 'PUBLISHER',
}
