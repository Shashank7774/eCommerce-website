import { useEffect, useState } from "react";

export default function AdminNewsletter() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/newsletter")
      .then(res => res.json())
      .then(setEmails);
  }, []);

  return (
    <div>
      <h2>Subscribers</h2>
      {emails.map(e => <p key={e._id}>{e.email}</p>)}
    </div>
  );
}
