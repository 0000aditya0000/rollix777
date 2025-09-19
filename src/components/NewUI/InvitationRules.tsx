import { ChevronLeft, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InvitationRules = () => {
  const navigate = useNavigate();

  const rebateData = [
    { level: "L0", teamNumber: 0, teamBetting: "0", teamDeposit: "0" },
    { level: "L1", teamNumber: 5, teamBetting: "500K", teamDeposit: "100K" },
    { level: "L2", teamNumber: 10, teamBetting: "1,000K", teamDeposit: "200K" },
    { level: "L3", teamNumber: 15, teamBetting: "2.50M", teamDeposit: "500K" },
    { level: "L4", teamNumber: 20, teamBetting: "3.50M", teamDeposit: "700K" },
    { level: "L5", teamNumber: 25, teamBetting: "5M", teamDeposit: "1,000K" },
    { level: "L6", teamNumber: 30, teamBetting: "10M", teamDeposit: "2M" },
    { level: "L7", teamNumber: 100, teamBetting: "100M", teamDeposit: "20M" },
    { level: "L8", teamNumber: 500, teamBetting: "500M", teamDeposit: "100M" },
    {
      level: "L9",
      teamNumber: 1000,
      teamBetting: "1,000M",
      teamDeposit: "200M",
    },
    {
      level: "L10",
      teamNumber: 5000,
      teamBetting: "1,500M",
      teamDeposit: "300M",
    },
  ];

  const RuleCard = ({
    number,
    content,
    className = "",
  }: {
    number: string;
    content: string;
    className?: string;
  }) => (
    <div className={`space-y-3 mb-6 ${className}`}>
      {/* Rule Number */}
      <div
        className="w-full py-3 text-center text-white font-bold text-lg rounded-t-3xl"
        style={{
          background: "linear-gradient(135deg, #d31c02 0%, #bf1402 100%)",
          clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {number}
      </div>

      {/* Rule Content */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: "#1f0e0e" }}>
        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: "#bc9713" }}
        >
          {content}
        </p>
      </div>
    </div>
  );

  const RebateIcon = ({ level }: { level: string }) => (
    <div
      className="flex items-center justify-center w-12 h-8 rounded-md text-xs font-bold"
      style={{
        background:
          "linear-gradient(135deg, #f1a903 0%, #cf8904 50%, #db6903 100%)",
        color: "#220904",
      }}
    >
      <Crown className="w-3 h-3 mr-1" />
      {level}
    </div>
  );

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#220904" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{
          backgroundColor: "#160406",
          borderColor: "#4f350e",
        }}
      >
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="w-6 h-6"
          style={{ color: "#f1a903" }}
        />
        <h1 className="text-xl font-bold" style={{ color: "#f1a903" }}>
          Rules
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4">
        {/* Program Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#d31c02" }}>
            (Promotion Partner) Program
          </h2>
          <p style={{ color: "#bc9713" }}>
            This activity is valid for a long time
          </p>
        </div>

        {/* Rules 01 - 05 */}
        <RuleCard
          number="01"
          content={`There are 6 subordinate levels in inviting friends. 
            If A invites B, then B is a level 1 subordinate of A. 
            If B invites C, then C is a level 1 subordinate of B and also a level 2 subordinate of A. 
            If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.`}
        />
        <RuleCard
          number="02"
          content={`When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates.`}
        />
        <RuleCard
          number="03"
          content={`The invitee registers via the inviter's invitation code and completes the deposit. Shortly after that, the commission will be received immediately.`}
        />
        <RuleCard
          number="04"
          content={`The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.`}
        />
        <RuleCard
          number="05"
          content={`Commission rates vary depending on your agency level on that day.
            - Number of Teams: How many downline deposits you have to date.
            - Team Deposits: The total number of deposits made by your downline in one day.
            - Team Deposit: Your downline deposits within one day.`}
        />

        {/* Rebate Table */}
        <div className="mb-6">
          <div
            className="grid grid-cols-4 p-4 text-center text-white font-bold text-sm rounded-t-lg"
            style={{ backgroundColor: "#d31c02" }}
          >
            <div>Rebate Level</div>
            <div>Team Number</div>
            <div>Team Betting</div>
            <div>Team Deposit</div>
          </div>

          <div
            className="divide-y"
            style={{ backgroundColor: "#1f0e0e", borderColor: "#4f350e" }}
          >
            {rebateData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center p-3 text-center text-sm"
              >
                <div className="flex justify-center">
                  <RebateIcon level={row.level} />
                </div>
                <div style={{ color: "#bc9713" }}>{row.teamNumber}</div>
                <div style={{ color: "#e1910a" }}>{row.teamBetting}</div>
                <div style={{ color: "#cf8904" }}>{row.teamDeposit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules 06, 07, 08 */}
        <RuleCard
          number="06"
          content={`The commission percentage depends on the membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.
            The commission rate is specifically explained as follows
            View rebate ratio >>`}
        />
        <RuleCard
          number="07"
          content={`TOP20 commission rankings will be randomly awarded with a separate bonus.`}
        />
        <RuleCard
          number="08"
          content={`The final interpretation of this activity belongs to Daman Games.`}
          className="mb-20"
        />
      </div>
    </div>
  );
};

export default InvitationRules;
