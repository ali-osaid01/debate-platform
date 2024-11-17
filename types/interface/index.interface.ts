interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  }
  
  interface ApiResponse<T> {
    response: {
      data: T; 
      pagination: Pagination; 
    };
  }