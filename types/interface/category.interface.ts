interface ISubCategory {
    _id: string;
    title: string;
    parent: string;
  }
  
  interface ICategory {
    _id: string;
    title: string;
    isDeleted: boolean;
    subCategories?: ISubCategory[];
    hasSubCategory: boolean;
  }