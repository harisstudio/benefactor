"use client";

export function CardForm() {
  return (
    <div className="space-y-3 pt-3 border-t border-gray-100">
      <input
        type="email"
        placeholder="Email address"
        className="w-full h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="First name"
          className="h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
        />
        <input
          type="text"
          placeholder="Last name"
          className="h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
        />
      </div>

      <label className="flex items-center gap-2 text-xs text-text-dark cursor-pointer min-h-[44px]">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
        Use as billing name
      </label>

      <input
        type="text"
        placeholder="Card number"
        className="w-full h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="MM/YY"
          className="h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
        />
        <input
          type="text"
          placeholder="CVV"
          className="h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
        />
      </div>

      <input
        type="text"
        placeholder="Name on card"
        disabled
        className="w-full h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-gray bg-bg-off-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="block text-xs text-text-gray mb-1">Country</span>
          <select className="w-full h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark bg-white focus:outline-none focus:border-primary-navy">
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
        <div>
          <span className="block text-xs text-text-gray mb-1 invisible">.</span>
          <input
            type="text"
            placeholder="Postal code"
            className="w-full h-11 px-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-text-dark cursor-pointer min-h-[44px]">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
        Save card for future donations
      </label>
    </div>
  );
}
