import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header className="bg-gray-200 p-4 border border-gray-300">
        <Header.Root>
          <Header.Content className="text-red-700 font-semibold text-xl">
            City Builder
          </Header.Content>
        </Header.Root>
      </Header>
      <main>Build your city here!</main>
    </>
  );
}
