import {ReactNode} from "react";

import "./Layout.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation.tsx";

type LayoutProps = {
    children: ReactNode

}
export default function Layout(props: Readonly<LayoutProps>) {
    return(
        <div className="frame">
            <Header/>
            <div className="container">
                <main>
                    {props.children}
                </main>
            </div>
            <Navigation/>
        </div>
    )
}