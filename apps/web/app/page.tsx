import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row">
      <h1>item 1</h1>
      <h1>item 2</h1>
    </div>
  );
  // redirect('/main');
}
