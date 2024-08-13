export type childrenType = {
  children: React.ReactNode;
};


export type profileData = {
  profilePic: FileList;
  username: string;
};

export type deleteCommentType = {
  commentId: string;
  articleId: string;
};

export type deleteArticleType = {
  id: string;
  userId: string;
};

export type removeVoteType = {
  voteId: string;
  voteType: "UPVOTE" | "DOWNVOTE";
};

export type errorResponceType = {
  success: false;
  error: { message: string };
};

export type successResponceType<T> = {
  success: true;
  data: T;
};

export type unBookmarkArticleType = {
  articleId: string;
  bookmarkId: string;
};

export type voteType = {
  articleId: string;
  voteType: "UPVOTE" | "DOWNVOTE";
};


 export type addCommentType = {
   slug: string;
   comment: string;
   commentType: string;
   commentId: string;
 }; 