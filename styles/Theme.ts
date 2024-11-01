type Theme = {

    colors: {
        primary: string;
        secondary: string;
        white: string;
        black: string;
        bgColor: string;
        error:string;
        sucess:string;
    }
    padding: {
        pd4: string,
    },
    fontFamily: {
        primary: string
    }
    mdBreakpoint: number,
    smBreakpoint: number
}
export default Theme;