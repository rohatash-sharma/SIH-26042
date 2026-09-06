function Tabs({ tabs = [], activeTab, onChange }) {
  return <div className="tabs">
    <div className="tabs__list">
      {tabs.map((tab) => <button key={tab.value} type="button"
        className={["tabs__trigger", activeTab === tab.value ? "is-active" : ""].filter(Boolean).join(" ")}
        onClick={() => onChange?.(tab.value)}>
        {tab.label}
      </button>)}
    </div>
  </div>;
}
export default Tabs;
