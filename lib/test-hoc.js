export default (Comp) => {
    return function TestHocComp ( Component, pageProps, ...rest) {

        console.log(Component, pageProps)
        if (pageProps) {
            //pageProps.aaa = '1234'
        }

        return <Comp Component={Component} pageProps={pageProps} {...rest} />
    }

    TestHocComp.getInitialProps = Comp.getInitialProps
} 