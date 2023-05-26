import PageWrapper from "../components/layout/PageWrapper";
import Delivery from "../components/modules/checkout/Delivery";
import Invoice from "../components/modules/checkout/Invoice";
import Payment from "../components/modules/checkout/Payment";

const Checkout = () => {
    return ( 
        <div className="py-10">
            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-6">
                    <div className="space-y-6 lg:col-span-2">
                        <Delivery />
                        <Payment />
                    </div>
                    <Invoice />
                </div>
            </PageWrapper>
        </div>
    );
}
 
export default Checkout;