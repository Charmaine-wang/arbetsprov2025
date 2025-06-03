import "styled-components";
import { Theme } from "../theme/defaultTheme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
