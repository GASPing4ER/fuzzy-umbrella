import styles from "./page.module.css";

import logo from "@/public/logo.svg";
import dinnerImg from "@/public/dinner.png"

import Image from "next/image";
import Link from "next/link";

import adventuresIcon from "@/public/adventures.svg"
import dinnersIcon from "@/public/dinners.svg"
import discussionsIcon from "@/public/discussions.svg"
import networkingIcon from "@/public/networking.svg"

import Experience from "@/components/experience/experience";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Image src={logo} alt="logo" width={100} />
        <h1>Vanguard Lodge</h1>
        <hr />
        <h2>"Igniting Ambition, Cultivating Excellence"</h2>
        <button><a href="#introduction">Join the movement</a></button>
      </main>

      <div id="introduction" className={styles.introduction}>
        <Image src={dinnerImg} alt="dinner with the boys" width={500} priority/>
        <div className={styles.introContext}>
          <h2>Welcome to Vanguard Lodge: <br/> Where Brotherhood Meets Excellence</h2>
          <hr />
          <p>At Vanguard Lodge, we're more than just a men's club – we're a community of like-minded individuals united by a shared passion for growth, camaraderie, and achievement. Whether you're seeking meaningful connections, stimulating conversations, or opportunities for personal and professional development, you'll find it all within our distinguished enclave.</p>
          <div><button><Link href="/membership">Become a member</Link></button></div>
        </div>
      </div>

      <div className={styles.experiences}>
        <div className={styles.experienceLeft}>
          <h3>EXPERIENCE</h3>
          <h2>Elevated Events</h2>
          <hr />
          <p>From intimate gatherings to grand celebrations, our events are designed to inspire, engage, and enrich.</p>
        </div>
        <div className={styles.experienceRight}>
          <Experience icon={networkingIcon} title="Networking Mixers" desc="Connect with like-minded individuals, forge meaningful relationships, and discover new opportunities at our networking mixers."/>
          <Experience icon={dinnersIcon} title="Gourmet Dinners" desc="Savor exquisite cuisine and enjoy fine dining experiences with our gourmet dinners. Join us for culinary delights and memorable evenings."/>
          <Experience icon={discussionsIcon} title="Discussion Groups" desc="Engage in lively conversations, share ideas, and broaden your horizons with our discussion groups. From current affairs to literature, explore diverse topics in a welcoming setting."/>
          <Experience icon={adventuresIcon} title="Outdoor Adventures" desc="Escape the ordinary and embrace adventure with our outdoor activities. From axe throwing to hiking, join us for exhilarating experiences."/>
        </div>
      </div>
    </>
  );
}
