const PageWrapper = ({ children }) => {
    return ( 
        <div className="px-5 mx-auto sm:px-0 sm:w-11/12 xl:max-w-7xl">{ children }</div>
    );
}
 
export default PageWrapper;