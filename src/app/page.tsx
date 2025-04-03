import styles from "./page.module.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Image from "next/image";

export default function Home() {
  const imageLink = "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin ligula ac augue interdum suscipit. 
  Nam rhoncus elit vel erat congue congue. Duis et eros et odio condimentum lacinia et non ante. Mauris sollicitudin rhoncus euismod. 
  Donec sem arcu, tincidunt sed placerat nec, pharetra id odio. Morbi velit odio, tincidunt sed posuere vel, 
  auctor et sem. Nulla posuere metus in odio efficitur, sed varius diam tincidunt. Nam pharetra sit amet diam et aliquet. 
  Ut ut hendrerit neque, at aliquam dolor. Proin nunc sem, luctus vel ornare id, tincidunt eget nunc. 
  Nullam malesuada ante sit amet dui tristique, vel mollis nulla blandit. Pellentesque tristique, 
  lectus tristique tristique lacinia, dolor ex rhoncus libero, eu lacinia felis dolor eget nisl. 
  Quisque euismod sagittis orci convallis ullamcorper. Proin congue, lacus non ornare vestibulum, 
  nisi tortor eleifend augue, in porttitor justo sem sed erat. Aliquam tempus, purus in lobortis finibus, 
  nibh libero egestas arcu, vitae.
  `
  return (
    <div  className={styles.page}>
      <Navigation />
      <main>
        <h1 className={styles.mainContent}>Hópverkefni 2</h1>
        <section className="section">
          <p className={styles.paragraph}>{loremIpsum}</p>
          <Image
              src={ imageLink || "/placeholder.jpg"}
              alt={"Text"}
              width={150}
              height={225}
              className={styles.mintImage}
            />
        </section>

      </main>
      <Footer/>
    </div>
  );
}
