
import AllRentals from "../components/AllRentals/AllRentals";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";


export default function AllRentalsPage() {
    return (

        <div>
            <Navigation />
            <main>
                <AllRentals />
            </main>
            <Footer />
        </div>
    )
}