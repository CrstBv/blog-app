const Layout =({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-slate-400 bg-center bg-cover ">
            {children}
        </div>
    )
}

export default Layout