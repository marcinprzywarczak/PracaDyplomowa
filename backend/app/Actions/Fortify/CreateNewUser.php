<?php

namespace App\Actions\Fortify;

use App\Models\Firm;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Spatie\Permission\Models\Role;
use Symfony\Component\Console\Output\StreamOutput;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
//        $output = new StreamOutput(fopen('php://stdout', 'w'));
//        $output->writeln('test');
//        $output->writeln($input);
        /*
         * function validatenip($nip) {
            $nipWithoutDashes = preg_replace("/-/","",$nip);
            $reg = '/^[0-9]{10}$/';
            if(preg_match($reg, $nipWithoutDashes)==false)
                return false;
            else
            {
                $digits = str_split($nipWithoutDashes);
                $checksum = (6*intval($digits[0]) + 5*intval($digits[1]) + 7*intval($digits[2]) + 2*intval($digits[3]) + 3*intval($digits[4]) + 4*intval($digits[5]) + 5*intval($digits[6]) + 6*intval($digits[7]) + 7*intval($digits[8]))%11;

                return (intval($digits[9]) == $checksum);
            }
            }
        function validateregon9($regon) {
            $reg = '/^[0-9]{9}$/';
            if(preg_match($reg, $regon)==false)
                return false;
            else
            {
                $digits = str_split($regon);
                $checksum = (8*intval($digits[0]) + 9*intval($digits[1]) + 2*intval($digits[2]) + 3*intval($digits[3]) + 4*intval($digits[4]) + 5*intval($digits[5]) + 6*intval($digits[6]) + 7*intval($digits[7]))%11;
                if($checksum == 10)
                    $checksum = 0;

                return (intval($digits[8]) == $checksum);
            }
}
         */
        $rules = [];
        if($input['isFirmAccount'] === 'true')
        {
            $rules = [
                'isFirmAccount' => ['required'],
                'first_name' => ['required', 'string', 'max:255'],
                'sure_name' => ['required', 'string', 'max:255'],
                'phone_number' => ['required', 'regex:/^(?:\(?\?)?(?:[-\.\(\)\s]*(\d)){9}\)?$/'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class),
                ],
                'password' => $this->passwordRules(),
                'user_avatar' => ['nullable', 'image'],
                'firm_name' => ['required', 'string', 'max:255'],
                'nip' => ['required', 'string'],
                'regon' => ['required', 'string'],
                'street' => ['nullable'],
                'number' => ['required', 'string'],
                'zip_code' => ['required', 'string', 'regex:/^(\d){2}\-(\d){3}$/'],
                'locality' => ['required', 'string'],
                'firm_logo' => ['nullable', 'image'],
            ];
        }
        else{
            $rules = [
                'isFirmAccount' => ['required'],
                'first_name' => ['required', 'string', 'max:255'],
                'sure_name' => ['required', 'string', 'max:255'],
                'phone_number' => ['required', 'regex:/^(?:\(?\?)?(?:[-\.\(\)\s]*(\d)){9}\)?$/'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class),
                ],
                'password' => $this->passwordRules(),
                'user_avatar' => ['nullable', 'image'],
            ];
        }
        Validator::make($input, $rules)->validate();

        $user = DB::transaction(function () use (&$input){
            if(request()->hasFile('user_avatar'))
                $user_avatar = request()->file('user_avatar')->store('avatars');
            else
                $user_avatar = 'public/default_avatar.jpg';

            if($input['isFirmAccount'] === 'true' && request()->hasFile('firm_logo'))
                $firm_logo = request()->file('firm_logo')->store('avatars');
            else
                $firm_logo = 'public/default_avatar.jpg';


            if($input['isFirmAccount'] === 'true')
            {
                $firm = Firm::create([
                    'name' => $input['firm_name'],
                    'NIP' => $input['nip'],
                    'REGON' => $input['regon'],
                    'street' => $input['street'],
                    'number' => $input['number'],
                    'zip_code' => $input['zip_code'],
                    'locality' => $input['locality'],
                    'logo_url' => asset($firm_logo),
                    'logo' => $firm_logo,
                ]);
                $user = User::create([
                    'first_name' => $input['first_name'],
                    'sure_name' => $input['sure_name'],
                    'firm_id' => $firm->id,
                    'email' => $input['email'],
                    'phone_number' => $input['phone_number'],
                    'password' => Hash::make($input['password']),
                    'avatar_url' => asset($user_avatar),
                    'avatar' => $user_avatar,
                ]);
                $firmOwnerRole = Role::findByName(config('app.firm_owner_role'));
                if(isset($firmOwnerRole))
                    $user->assignRole($firmOwnerRole);
            }
            else
            {
                $user = User::create([
                    'first_name' => $input['first_name'],
                    'sure_name' => $input['sure_name'],
                    'email' => $input['email'],
                    'phone_number' => $input['phone_number'],
                    'password' => Hash::make($input['password']),
                    'avatar_url' => asset($user_avatar),
                    'avatar' => $user_avatar,
                ]);
                $userRole = Role::findByName(config('app.user_role'));
                if(isset($userRole))
                    $user->assignRole($userRole);
            }
            return $user;
        });
        return $user;
    }
}
