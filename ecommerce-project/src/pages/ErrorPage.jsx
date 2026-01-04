import { Header } from "../components/Header";
import "./ErrorPage.css";

export function ErrorPage() {
  return (
    <>
      <title>Error 404</title>
      <Header />
      <div className="warning-container">
        <h1>404: Page not found</h1>
        <h2>Try with something else</h2>
      </div>
    </>
  );
}
