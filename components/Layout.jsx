import Link from  'next/link'
export default ({ children }) => (
    <>
    <header>
        <Link href="/">
            <a title="HP">Index</a>
        </Link>
        <br />
        <Link href="/test/124">
            <a title="HP">test</a>
        </Link>
    </header>
    {children}
    </>
)