export type authType = {
  className?: string;
  actionType: "signup" | "signin";
  href?: string | undefined;
};

export type authActionType = {
  actionType: "signup" | "signin";
  changeActionType: () => void;
};
