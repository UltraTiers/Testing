import { SiteShell } from "@/components/site-shell";
import { fetchPlayers } from "@/lib/api";

export default async function DocsPage() {
  const players = await fetchPlayers();

  // Calculate tested players stats
  const totalPlayers = players.length;
  const playersWithTiers = players.filter(p => p.tiers.length > 0).length;
  
  // Count players by tier
  const tierCounts: Record<string, number> = {};
  players.forEach(player => {
    player.tiers.forEach(tier => {
      tierCounts[tier.tier] = (tierCounts[tier.tier] || 0) + 1;
    });
  });

  const docsContent = (
    <>
      <div className="docs-container">
        <section className="docs-section">
          <h2>How the Point System Works</h2>
          <p>
            UltraTiers tracks player rankings across 28 different game modes. 
            Each tier assignment earns points based on the difficulty and prestige of achieving that rank.
          </p>
          
          <div className="point-system-grid">
            <div className="point-card">
              <div className="point-header">HT1 - Highest Tier</div>
              <div className="point-value">60 pts</div>
              <div className="point-bar" style={{width: '100%'}}></div>
              <div className="point-desc">Top 1 player in any gamemode</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT1 - Lowest Tier 1</div>
              <div className="point-value">45 pts</div>
              <div className="point-bar" style={{width: '75%'}}></div>
              <div className="point-desc">Entry level for top tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT2 - High Tier 2</div>
              <div className="point-value">30 pts</div>
              <div className="point-bar" style={{width: '50%'}}></div>
              <div className="point-desc">Second highest tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT2 - Low Tier 2</div>
              <div className="point-value">20 pts</div>
              <div className="point-bar" style={{width: '33%'}}></div>
              <div className="point-desc">Lower second tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT3 - High Tier 3</div>
              <div className="point-value">10 pts</div>
              <div className="point-bar" style={{width: '17%'}}></div>
              <div className="point-desc">Third tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT3 - Low Tier 3</div>
              <div className="point-value">6 pts</div>
              <div className="point-bar" style={{width: '10%'}}></div>
              <div className="point-desc">Lower third tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT4 - High Tier 4</div>
              <div className="point-value">4 pts</div>
              <div className="point-bar" style={{width: '7%'}}></div>
              <div className="point-desc">Fourth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT4 - Low Tier 4</div>
              <div className="point-value">3 pts</div>
              <div className="point-bar" style={{width: '5%'}}></div>
              <div className="point-desc">Lower fourth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT5 - High Tier 5</div>
              <div className="point-value">2 pts</div>
              <div className="point-bar" style={{width: '3%'}}></div>
              <div className="point-desc">Fifth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT5 - Low Tier 5</div>
              <div className="point-value">1 pt</div>
              <div className="point-bar" style={{width: '2%'}}></div>
              <div className="point-desc">Entry tier</div>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Tier Breakdown</h2>
          <div className="tier-explanation">
            <div className="tier-row">
              <span className="tier-label ht">HT (High Tier)</span>
              <p>Players who achieved the top position in a specific gamemode</p>
            </div>
            <div className="tier-row">
              <span className="tier-label lt">LT (Low Tier)</span>
              <p>Players who are on the leaderboard but not at the top position</p>
            </div>
            <div className="tier-row">
              <span className="tier-label unknown">Unknown</span>
              <p>Players who have played but not yet ranked on the leaderboard</p>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Tested Players Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{totalPlayers.toLocaleString()}</div>
              <div className="stat-label">Total Players</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{playersWithTiers.toLocaleString()}</div>
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
      </div>
    </>
  );

  return <SiteShell initialPlayers={players} isDocsPage={true} docsContent={docsContent} />;
}