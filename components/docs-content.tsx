"use client";

import { useMemo, useState } from "react";
import { tierScores } from "@/lib/modes";

interface DocsContentProps {
  totalPlayers: number;
  testedTiers: number;
  tierCounts: Record<string, number>;
}

export function DocsContent({ totalPlayers, testedTiers, tierCounts }: DocsContentProps) {
  const [activeTab, setActiveTab] = useState<"about" | "stats" | "points">("about");
  
  const tierEntries = useMemo(() => 
    Object.entries(tierScores).filter(([key]) => key !== "Unknown"),
    []
  );

  return (
    <div className="docs-container">
      <div className="docs-tabs">
        <button 
          className={`docs-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button 
          className={`docs-tab ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
        <button 
          className={`docs-tab ${activeTab === "points" ? "active" : ""}`}
          onClick={() => setActiveTab("points")}
        >
          Points
        </button>
      </div>

      {activeTab === "about" && (
        <section className="docs-section">
          <h2>About UltraTiers</h2>
          <p>
            UltraTiers is a comprehensive ranking system for UltraPVP network players. 
            It tracks player performance across all game modes and provides a unified point system 
            to compare overall skill and dedication across the network.
          </p>
        </section>
      )}

      {activeTab === "stats" && (
        <section className="docs-section">
          <h2>Tested Players Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{totalPlayers.toLocaleString()}</div>
              <div className="stat-label">Total Players</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{testedTiers.toLocaleString()}</div>
              <div className="stat-label">Tested Tiers</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">10</div>
              <div className="stat-label">Tier Types</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">28</div>
              <div className="stat-label">Game Modes</div>
            </div>
          </div>
          
          <div className="tier-distribution">
            <h3>Tier Distribution</h3>
            <div className="distribution-bars">
              {Object.entries(tierCounts)
                .filter(([tier]) => tier !== "Unknown" && tier !== "Unranked")
                .sort(([a], [b]) => {
                  const order = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map(([tier, count]) => {
                  const validTiers = Object.keys(tierCounts).filter(t => t !== "Unknown" && t !== "Unranked");
                  const maxCount = Math.max(...validTiers.map(t => tierCounts[t]));
                  return (
                    <div key={tier} className="distribution-row">
                      <span className="distribution-tier">{tier}</span>
                      <div className="distribution-bar-container">
                        <div 
                          className="distribution-bar" 
                          style={{width: `${(count / maxCount) * 100}%`}}
                        ></div>
                      </div>
                      <span className="distribution-count">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {activeTab === "points" && (
        <section className="docs-section">
          <h2>How the Point System Works</h2>
          <p>
            UltraTiers tracks player rankings across 28 different game modes. 
            Each tier assignment earns points based on the difficulty and prestige of achieving that rank.
          </p>
          
          <div className="point-system-grid">
            {tierEntries.map(([tier, points]) => (
              <div 
                key={tier} 
                className="point-card"
              >
                <div className="point-header">{tier}</div>
                <div className="point-value">{points} pts</div>
                <div 
                  className="point-bar" 
                  style={{width: `${(points / 60) * 100}%`}}
                ></div>
                <div className="point-desc">
                  {tier.startsWith("HT") ? "Top position in gamemode" : "Leaderboard rank"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}