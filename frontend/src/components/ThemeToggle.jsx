export default function ThemeToggle() {
  return (
    <button className="theme-toggle"
      onClick={() =>
        document.body.classList.toggle("dark")
      }
    >
      🌙
    </button>
  );
}
