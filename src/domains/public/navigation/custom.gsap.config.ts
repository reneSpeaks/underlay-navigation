import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
CustomEase.create("burger", "M0,0 C0.4,0 0.2,1 1,1");
