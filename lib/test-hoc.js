export default (Comp) => {
    function TestHocComp ({Component, pageProps, ...rest }) {

        console.log(Component, pageProps)
        if (pageProps) {
            pageProps.test = '1234'
        }

        return <Comp Component={Component} pageProps={pageProps} {...rest} />
    }

    TestHocComp.getInitialProps = Comp.getInitialProps

    return TestHocComp
} 